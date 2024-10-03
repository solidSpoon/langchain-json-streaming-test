import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '../.env') });
let model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    apiKey: process.env.HUB_API_KEY,
    // apiKey: process.env.NB_API_KEY,
    configuration: {
        // baseURL: "https://oneapi.gptnb.ai/v1",
        baseURL: "https://aihubmix.com/v1",
    }
});


const joke = z.object({
    setup: z.string().describe("The setup of the joke"),
    punchline: z.string().describe("The punchline to the joke"),
    rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
});

const structuredLlm = model.withStructuredOutput(joke);



const normalCll = async () => {
    console.log("Normal Call");
    let res = await structuredLlm.invoke("Tell me a joke about cats");
    console.log(res);
}
const streamCall = async () => {
    console.log("Stream Call");
    let res = await structuredLlm.stream("Tell me a joke about cats");
    for await (const chunk of res) {
        console.log(chunk);
    }
}
const call = async () => {
    await normalCll();
    await streamCall();
}
call();

