from transformers import pipeline
import re

sentiment_model = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def detect_sentiment(text):

    score = 0
    vulnerable_sentences = []

    # Remove URLs before analysis
    text = re.sub(r'http\S+|www\S+', '', text)

    # Split properly
    sentences = re.split(r'[.!?]', text)

    for sentence in sentences:
        clean_sentence = sentence.strip()

        # Ignore short meaningless fragments
        if len(clean_sentence) < 15:
            continue

        result = sentiment_model(clean_sentence)[0]

        if result["label"] == "NEGATIVE" and result["score"] > 0.85:
            score += 15
            vulnerable_sentences.append(clean_sentence)

    return {
        "score": score,
        "sentences": vulnerable_sentences
    }