from sklearn.feature_extraction.text import TfidfVectorizer

def extract_keywords_tfidf(text, top_n=10):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform([text])
    feature_names = tfidf.get_feature_names_out()
    scores = tfidf.idf_
    keywords = sorted(zip(feature_names, scores), key=lambda x: x[1])[-top_n:]
    return [word for word, score in keywords]
