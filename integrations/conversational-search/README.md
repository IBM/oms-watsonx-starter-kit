# Conversational search

The [conversational search](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-search-overview) feature is the implementation of RAG (Retrieval Augumented Generation) or Content Grounded Answering within WatsonX Assistant. This feature is available on standalone WatsonX Assistant plus edition and Assistant builder in WatsonX Orchestrate. The conversational search feature integrates with Elasticsearch, Watson Discovery, or any other search retrieval system utilizing the [custom search service integration](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-search-overview#custom-service-integration-overview). In this guide, we cover a conversational search integration using [Elasticsearch](https://www.elastic.co/elasticsearch) which is a recommended data store and vector database. We rely on Elasticsearch to fetch highly relevant documentation content based on a search query that is used downstream to assist the configured WatsonX LLM in producing a content-grounded answer. Note that the Elasticsearch instance can either be provisioned on the IBM Cloud or deployed externally. When deployed externally, you must ensure that it's endpoint is accessible from IBM Cloud for WatsonX to run queries.

## Prerequisites

1. IBM watsonX Orchestrate (on AWS or on IBM Cloud or installed via Cloud Pack For Data)
2. Elasticsearch version 8.12 or higher. This setup requires the use ELSER v2 which is available from version 8.12 and above. The instructions to setup Elasticsearch can be found [here](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/integrations/extensions/docs/elasticsearch-install-and-setup/ICD_Elasticsearch_install_and_setup.md).

## Procedure

There are two parts to enable conversational search. The first part is to ingest your documentation corpus into an Elasticsearch index from which we can perform search queries. The second part is to setup the conversational search integration within WatsonX by configuring the details about the Elasticsearch instance, including the index, search query, and other related settings in the Assistant Builder.

### 1. Ingest documents into Elasticsearch

There are a number of ways to ingest documents into an Elasticsearch index. In this guide, we cover two primary approaches with additional references below. Bear in mind that the high level steps behind both approaches are the same:

Before ingestion, you will want to consider the following steps:
- Setup an ingest pipeline that utilizes ELSER v2 spare embeddings for semantic search
- Setup an index that utilizes the ELSER v2 pipeline above, along with any additional settings such as a text analyzer

During ingestion, you will want to consider the following steps:
- Load the document(s)
- Optionally, pre-process and chunk the documents into smaller segments for downstream RAG application
- Upload (or bulk-upload) the resulting documents into the target index

The first approach leverages FSCrawler. In this approach, FSCrawler processes all the files and folders provided to it via configuration and runs the ingestion pipeline within Elasticsearch. The ingestion pipeline can be configured to do chunking (and overlapping) of the document content which is then provided to ELSER v2 to generate the tokens to index.

The second approach leverages LangChain's recursive character text splitting to process the document and break it down into chunks. The chunks are then ingested using an inference pipeline with ELSER v2 and loaded into the index.

#### How to index documents using FSCrawler

The steps to ingest documents via FSCrawler are documented [here](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/integrations/extensions/docs/elasticsearch-install-and-setup/how_to_index_pdf_and_office_documents_elasticsearch.md)

#### How to index documents using Python

The steps to ingest documents via LangChain is documented [here](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/integrations/extensions/docs/elasticsearch-install-and-setup/python-document-ingestion/README.md)

### 2. Setup conversational search integration in AI Assistant

The steps to configure conversational search integration with AI Assistant can be found [here](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-search-elasticsearch-add)


## Recommendations
Comparative analysis was done on Elser1, Elser2, PDF, MarkDown and Elastic Search Indexing using FSCrawler for ingestion. 


1. Elser2 is recommended over Elser1. 
2. Markdown produced better results than PDF
3. Include a Table Of Contents. 
4. Set  the 'content = True' in FSCrawler [Here](https://fscrawler.readthedocs.io/en/latest/admin/fs/local-fs.html#ignore-content)
5. Create an index with nested mappings [Here](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/integrations/extensions/docs/elasticsearch-install-and-setup/how_to_index_pdf_and_office_documents_elasticsearch.md#step-2-create-an-index-with-a-nested-mapping-for-storing-chunked-text-and-tokens)
4. Chunk the document into FSCrawler using regex and include the overlap feature [Here](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/integrations/extensions/docs/elasticsearch-install-and-setup/how_to_index_pdf_and_office_documents_elasticsearch.md#step-2-create-an-index-with-a-nested-mapping-for-storing-chunked-text-and-tokens)


## Conversational search evaluation (optional)

As part of developing your conversational search integration, you may wish to evaluate different aspects of the system's performance. There are a number of different evaluation methodologies available, ranging from manual evaluation to automated assessment pipelines. In this guide, we recommend some methodologies for your consideration, including links to popular LLM evaluation frameworks.

It is important to conceptualize the conversational search system into two or more subsystems. For instance, there is a _retrieval subsystem_ that focuses on producing highly relevant documents from an index given a search query, but there is also a _generation subsystem_ that uses an LLM to generate responses to user questions given a set of documents in a context window. Performance may be strong in one subsystem but weak in another. For this reason, it is important to consider a variety of different metrics when assesing your conversational search system. Following the example, you may wish to consider metrics that evaluate the system's ability to recall documents as part of its retrieval process. Does the system return _relevant_ documents? Are those documents properly ranked in the search results? You may also wish to evaluate the system's ability to hallucinate responses. How _grounded_ or factually correct are your system's responses? To answer such questions, you may note that certain pre-requisite information is naturally required. For instance, you need a _reference_ or _ground truth_ answer in order to check how factually correct a generated response is comparison with the reference. Crafting these ground truth answers is not a trivial task, and there are also a variety of techniques to assist with this task.

For automating the evaluation methodology described above, you may wish to consider popular LLM frameworks such as [Llama Index](https://www.llamaindex.ai/) or [Ragas](https://docs.ragas.io/en/latest/getstarted/index.html). These frameworks allow you to generate evaluation datasets from your corporate documentation, as well tooling for performing automated evaluations. Each framework supports a set of RAG evaluation metrics which help you assess the different aspects of your system's performance as described above, e.g. context recall and answer correctness. It is not uncommon to use these frameworks in colaboration with human oversight to validate the quality of your evaluation datasets and results. Note that many of these frameworks employ a popular pattern of using LLMs to perform evaluation on certain metrics, where integration for [WatsonX LLMs](https://www.ibm.com/products/watsonx-ai) is commonly supported.

## Conversational search advanced techniques (optional)

As part of our own development experience, we have experimented with a variety of different techniques in an effort to improve the performance of our system. We share these techniques below for your consideration.

Perhaps the most impactful area of focus pertains to document _chunking_. We observe that there are a number of common chunking strategies, viz. recursive character text splitting, document-based chunking (markdown/html), semantic chunking, and even agentic chunking. Furthermore, each chunking strategy relies on a set of hyperparameters, e.g. window size and overlap size. We encourage developments teams to experiment with different strategies in an effort to identify what works best for their corporate data. We have seen promising results with certain advanced techniques like semantic chunking, but, bear in mind that, depending on the strategy, it may come with the additional cost of utilizing an embedding model or LLM.

Another important area of focus pertains to data normalization. For instance, in Elasticsearch, this would pertain to an index's text analyzers used during ingestion and query time. We observed using a text analyzer to tokenize and normalize (lowercase, stemming, etc.) lended itself to a more robust search experience. You may likewise wish to experiment with different normalization techniques and text analyzers for your custom use case.

Lastly, you may wish to consider advanced techniques within the RAG application domain. For instance, it is common to perform techniques like [query expansion](https://arxiv.org/pdf/2305.03653) to help improve search results. One other promising approach that we experimented with was using an LLM to generate a set of similiar question for each documentation chunk and, subsequently, to match those questions against the original user question at query time. For more inspiration, see this HuggingFace article on [Advanced RAG techniques](https://huggingface.co/learn/cookbook/en/advanced_rag).


## Useful links

- [Conversational search documentation](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-conversational-search)
- [WatsonX Assistant starter-kit for conversational search](https://github.com/watson-developer-cloud/assistant-toolkit/tree/master/integrations/extensions/starter-kits/language-model-conversational-search)
