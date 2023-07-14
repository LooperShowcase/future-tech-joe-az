let open_response;

let chat = [
    { role: "user", content: "hi" },
    { role: "assistant", content: "HI, how can i help you today" }
];

async function ChatUserAdd(feeling, question) {
    chat.push({ role: "user", content: "my happiness from 0-10 is " + feeling + ". my input is: " + question })
}

async function ChatassistantAdd(res) {
    chat.push({ role: "assistant", content: res })
}
/**/
async function openAItest(){
    let url="https://api.openai.com/v1/chat/completions"
    
    let part1 = "sk";
    let part2 = "-5bpxzQt9pRMB76Vl0GXRT3B";
    let part3 = "lbkFJJcrNpEhBx1KMnMPG7tjH";
    
    let apikey = part1 + part2 + part3;

    let data = {
        model:"gpt-3.5-turbo",
        messages: chat
    }

    try {
        const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${apikey}`
        },
        body: JSON.stringify(data)
        
    })

    if(response.ok) 
    {

        const responseData = await response.json();
        const message = responseData.choices[0].message.content;

        ChatassistantAdd(message);


        const speech = new SpeechSynthesisUtterance(message)
        speechSynthesis.speak(speech)
        return message;
    }
    }catch(error){
        console.log("opps an error: "+error);
    }
  

};

















