import { NextRequest, NextResponse } from 'next/server';
import { Message } from 'ai';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
  BaseMessage,
} from '@langchain/core/messages';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const messages: Message[] = body.messages ?? [];

  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  if (!question) {
    return NextResponse.json('Error: No question in the request', {
      status: 400,
    });
  }

  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages,
      videoId: body.videoId,
    });

    return streamingTextResponse;
  } catch (error) {
    console.error('Internal server error ', error);
    return NextResponse.json('Error: Something went wrong. Try again!', {
      status: 500,
    });
  }
}

const formatMessage = (message: Message) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content);
  }

  if (message.role === 'assistant') {
    return new AIMessage(message.content);
  }

  if (message.role === 'system') {
    return new SystemMessage(message.content);
  }

  return new HumanMessage(message.content);
};

type callChainArgs = {
  question: string;
  chatHistory: BaseMessage[];
  videoId: string;
};

async function callChain({ question, chatHistory, videoId }: callChainArgs) {
  try {
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');
    const vectorStore = await getVectorStore();

    const chatModel = new ChatOpenAI({
      model: 'gpt-4-turbo-2024-04-09',
      temperature: 0,
    });

    const retriever = vectorStore.asRetriever(3, { source: videoId });

    const historyAwarePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
      [
        'user',
        'Given the above conversation, generate a search query to look up in order to get information relevant to the conversation',
      ],
    ]);

    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: chatModel,
      retriever,
      rephrasePrompt: historyAwarePrompt,
    });

    const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
      [
        'system',
        "Answer the user's questions based on the below context:\n\n{context}",
      ],
      new MessagesPlaceholder('chat_history'),
      ['user', '{input}'],
    ]);

    const historyAwareCombineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt: historyAwareRetrievalPrompt,
    });

    const conversationalRetrievalChain = await createRetrievalChain({
      retriever: historyAwareRetrieverChain,
      combineDocsChain: historyAwareCombineDocsChain,
    });

    const result = await conversationalRetrievalChain.invoke({
      chat_history: chatHistory || [],
      input: sanitizedQuestion,
    });

    return new Response(result.answer);
  } catch (e) {
    console.error(e);
    throw new Error('Call chain method failed to execute successfully!!');
  }
}

async function getVectorStore() {
  try {
    const pinecone = new Pinecone();
    const embeddings = new OpenAIEmbeddings();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });

    return vectorStore;
  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong while getting vector store !');
  }
}
