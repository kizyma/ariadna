const schemaCfg = {
    // generic name
    'class': 'Image',
    // declared in docker compose, self-explanatory
    'vectorizer': 'img2vec-neural',
    // https://arxiv.org/abs/1603.09320 - used search algorithm
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'img2vec-neural': {
            'imageFields': [
                'image'
            ]
        }
    },
    'properties': [
        {
            // primary data description
            'name': 'image',
            'dataType': ['blob']
        },
        {
            // aux data description
            'name': 'text',
            'dataType': ['string']
        }
    ]
}

export { schemaCfg };
