import { NextResponse } from 'next/server';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Document } from '@langchain/core/documents';
import he from 'he';

export async function POST(request: Request) {
  const body = await request.json();
  const videoUrl = body.videoUrl;

  if (!videoUrl) {
    return new Response('Missing video URL', {
      status: 400,
    });
  }

  const openAIApiKey = process.env.OPENAI_API_KEY;
  const pineconeIndexName = process.env.PINECONE_INDEX;

  if (!pineconeIndexName) {
    throw new Error('Pinecone index name is not set');
  }

  const pinecone = new Pinecone();
  const pineconeIndex = pinecone.Index(pineconeIndexName);

  const [docs, source] = await extractDataFromVideo(videoUrl);

  await createEmbeddings(openAIApiKey, docs, pineconeIndex);

  return NextResponse.json({ source });
}

async function extractDataFromVideo(videoUrl: string) {
  const loader = YoutubeLoader.createFromUrl(videoUrl, {
    language: 'fr',
    addVideoInfo: true,
  });

  const rawDocs = await loader.load();
  const docs = rawDocs.map((doc) => ({
    pageContent: he.decode(doc.pageContent),
    metadata: { source: doc.metadata.source },
  }));

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splittedDocs = await splitter.splitDocuments(docs);

  const source = rawDocs[0].metadata.source;

  return [splittedDocs, source];
}

async function createEmbeddings(
  openAIApiKey: string | undefined,
  docs: Document<Record<string, any>>[],
  pineconeIndex: Index<RecordMetadata>
) {
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  return vectorStore;
}
