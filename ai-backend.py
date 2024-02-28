import openai
import gradio as gr

openai.api_key = "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"

instructions = "I am here to support you as a special education teacher, providing guidance, encouragement, and resources tailored to your unique learning needs. My goal is to create a nurturing and inclusive environment where you feel valued and understood. Whether you need help with academic subjects, social skills, or coping strategies, I'm here to assist you with patience, empathy, and expertise. I understand that everyone learns differently, so I offer personalized strategies and accommodations to help you succeed. Let's work together to overcome challenges, celebrate your progress, and reach your full potential."


def custom_chat_gpt(user_input):
    messages = [{"role": "system", "content": instructions}]
    messages.append({"role": "user", "content": user_input})
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
    )
    
    chat_gpt_reply = response.choices[0].message.content.strip()
    return chat_gpt_reply

demo = gr.Interface(fn=custom_chat_gpt, inputs="text", outputs="text", title="Arnold Schwarzenegger")

demo.launch(share=True)
