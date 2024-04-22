import { NextRequest, NextResponse } from 'next/server';
import { callChain } from '@/lib/langchain';
import { Message } from 'ai';

const formatMessage = (message: Message) => {
  return `${message.role === 'user' ? 'Human' : 'Assistant'}: ${
    message.content
  }`;
};

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
      chatHistory: formattedPreviousMessages.join('\n'),
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