import whisper, json
model = whisper.load_model("small.en")
result = model.transcribe("public/audio.wav", word_timestamps=True, language="en")
caps = []
for seg in result["segments"]:
    for w in seg.get("words", []):
        txt = w["word"]
        caps.append({
            "text": txt,
            "startMs": round(w["start"]*1000),
            "endMs": round(w["end"]*1000),
            "timestampMs": round((w["start"]+w["end"])/2*1000),
            "confidence": round(w.get("probability", 1.0), 3),
        })
with open("src/captions.json","w") as f:
    json.dump(caps, f, indent=2)
print("WORDS:", len(caps))
print("FULL TEXT:", result["text"][:500])
