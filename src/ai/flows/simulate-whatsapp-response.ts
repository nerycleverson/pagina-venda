'use server';
/**
 * @fileOverview This file implements a Genkit flow to simulate a WhatsApp conversation.
 * It takes a customer's objection and a confectioner's desired tone as input,
 * generates a corresponding customer message, and then an AI-powered response
 * tailored to the tone and objection.
 *
 * - simulateWhatsappResponse - A function that simulates the WhatsApp response.
 * - SimulateWhatsappResponseInput - The input type for the simulateWhatsappResponse function.
 * - SimulateWhatsappResponseOutput - The return type for the simulateWhatsappResponse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulateWhatsappResponseInputSchema = z.object({
  customerObjection: z.enum([
    'Cliente recebe o preço e some',
    'Cliente pede desconto',
    'Cliente diz que está caro',
    'Não sei como conduzir a conversa',
  ]).describe('The specific objection or pain point the customer has.'),
  confectionerTone: z.enum([
    'Carinhosa, cheia de amor',
    'Direta e profissional',
    'Descontraída e brincalhona',
  ]).describe('The desired tone of voice for the confectioner\'s response.'),
});
export type SimulateWhatsappResponseInput = z.infer<typeof SimulateWhatsappResponseInputSchema>;

const SimulateWhatsappResponseOutputSchema = z.object({
  customerMessage: z.string().describe('The simulated customer message.'),
  aiResponse: z.string().describe('The AI-generated response in the confectioner\'s tone.'),
});
export type SimulateWhatsappResponseOutput = z.infer<typeof SimulateWhatsappResponseOutputSchema>;

/**
 * Maps a customer objection type to a sample customer message.
 */
function getCustomerMessage(objection: SimulateWhatsappResponseInput['customerObjection']): string {
  switch (objection) {
    case 'Cliente recebe o preço e some':
      return 'Oi! Vou conversar aqui em casa e qualquer coisa te aviso 😊';
    case 'Cliente pede desconto':
      return 'Adorei seu trabalho! Tem como fazer um descontinho?';
    case 'Cliente diz que está caro':
      return 'Amei o bolo, mas achei um pouco caro 😅';
    case 'Não sei como conduzir a conversa':
      return 'Queria um bolo para sábado. Quanto fica?';
    default:
      return 'Olá! Gostaria de fazer um orçamento.';
  }
}

const simulateWhatsappResponsePrompt = ai.definePrompt({
  name: 'simulateWhatsappResponsePrompt',
  input: { schema: z.object({
    customerMessage: z.string().describe('The simulated customer message.'),
    confectionerTone: z.string().describe('The desired tone of voice for the confectioner\'s response. Examples: Carinhosa, cheia de amor; Direta e profissional; Descontraída e brincalhona.'),
  })},
  output: { schema: SimulateWhatsappResponseOutputSchema.shape.aiResponse }, // Only output the AI response string
  prompt: `Você é o DoceZap IA, um assistente de inteligência artificial que ajuda confeiteiras a responderem suas clientes no WhatsApp e fecharem mais vendas.
Sua tarefa é gerar uma resposta para uma cliente, utilizando o tom de voz especificado pela confeiteira. A resposta deve ser profissional, persuasiva e alinhada com o estilo da confeiteira.

Instruções:
- A cliente enviou a seguinte mensagem: "{{{customerMessage}}}"
- O tom de voz desejado pela confeiteira é: "{{{confectionerTone}}}"
- A resposta deve ser concisa e focada em resolver a objeção ou pergunta da cliente, mantendo o tom.

Exemplos de resposta para a objeção de preço (Cliente diz que está caro) e diferentes tons:

Tom: Carinhosa, cheia de amor
Cliente: "Amei o bolo mas achei caro 😅"
Resposta: "Aii imagina! 🥰 Esse bolo é feito todo à mão, só pra deixar a sua festa linda — é por isso o valor. Me diz a data que eu acho o melhor jeito de caber no seu sonho, combinado?"

Tom: Direta e profissional
Cliente: "Amei o bolo mas achei caro 😅"
Resposta: "Entendo. O valor é esse porque é feito à mão e sob encomenda, exclusivo pra sua festa. Me passa a data que eu já te mostro as opções."

Tom: Descontraída e brincalhona
Cliente: "Amei o bolo mas achei caro 😅"
Resposta: "Hahaha entendo! Mas óh, esse é artesanal, feito só pra você — nada de bolo de prateleira 😄 Bora achar o tamanho que cabe no seu bolso?"

Agora, gere a resposta para a situação atual, usando o tom de voz e a mensagem da cliente fornecidos.`,
});

const simulateWhatsappResponseFlow = ai.defineFlow(
  {
    name: 'simulateWhatsappResponseFlow',
    inputSchema: SimulateWhatsappResponseInputSchema,
    outputSchema: SimulateWhatsappResponseOutputSchema,
  },
  async (input) => {
    const customerMessage = getCustomerMessage(input.customerObjection);

    const { output: aiResponse } = await simulateWhatsappResponsePrompt({
      customerMessage,
      confectionerTone: input.confectionerTone,
    });

    return {
      customerMessage,
      aiResponse: aiResponse!,
    };
  },
);

export async function simulateWhatsappResponse(
  input: SimulateWhatsappResponseInput
): Promise<SimulateWhatsappResponseOutput> {
  return simulateWhatsappResponseFlow(input);
}
