document.getElementById("extract").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extract_text" },
            async (response) => {

                if (chrome.runtime.lastError) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Error: " + chrome.runtime.lastError.message + "</p>";
                    return;
                }

                if (!response || !response.text) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Failed to extract text.</p>";
                    return;
                }

                const apiUrl = "http://127.0.0.1:5000/api";

                const n = Number(document.getElementById("count").value) || 10;

                try {
                    const res = await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            text: response.text,
                            n: n        
                        })
                    });

                    const data = await res.json();

                    const container = document.getElementById("keywords");
                    container.innerHTML = "";

                    data.keywords.forEach(word => {
                        const tag = document.createElement("span");
                        tag.className = "tag";
                        tag.textContent = word;
                        tag.style.cursor = "pointer";

                        tag.addEventListener("click", () => {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                action: "highlight",
                                keyword: word
                            });
                        });

                        container.appendChild(tag);
                    });

                } catch (err) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Error: " + err.message + "</p>";
                }
            }
        );
    });
});
