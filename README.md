## Description
This is a POC made for an educative purpose.
The goal is to create a small chatbot that can allow users to ask questions about the content of a Youtube video.
It uses the RAG technique.

## Pre-requisites

Create a `.env` file based on the `env.example` file.
Get the needed accesses from the following platforms:

On [Open AI](https://openai.com/blog/openai-api), you need to create a developer account and get an API key, for the `OPENAI_API_KEY` variable.

On [Pinecone](https://www.pinecone.io/), you need to get an API key for the `PINECONE_API_KEY` variable.
Then you'll need to create an index, for the `PINECONE_INDEX` variable.

On [Langsmith](https://www.langchain.com/langsmith), you'll need to get an API key for the `LANGCHAIN_API_KEY` variable.
And create a project, to fill the `LANGCHAIN_PROJECT` variable.


## Running the app

Install the depdendencies:
```bash
$ yarn install
```

Run the project in watchmode:
```bash
$ yarn dev
```
