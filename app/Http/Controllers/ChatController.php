<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;
use Exception;

class ChatController
{
    public function ask(Request $request)
    {
        try {
            // Validate user input
            $validated = $request->validate([
                'message' => 'required|string|max:5000|min:1',
            ], [
                'message.required' => 'Please provide a message.',
                'message.string' => 'Message must be text.',
                'message.max' => 'Message cannot exceed 5000 characters.',
                'message.min' => 'Message cannot be empty.',
            ]);

            $userMessage = $validated['message'];
$context = "You are the official e-Chem Virtual Assistant. e-Chem is a premier A/L Chemistry tutoring organization in Sri Lanka, established in 2019.

    GROUNDING RULES:
    1. Only use the information provided below.
    2. If a user asks a question you cannot answer with this information, say: 'I apologize, I don't have that specific information. Please contact our support team or talk to a human for further assistance. Hotline: 070 424 4444 / 071 022 8844 or Visit: info.echem.lk'
    3. Target Audience: A/L Chemistry students (Batches: 2025, 2026, 2027).

    SERVICES:
    - Theory Classes: Comprehensive A/L chemistry coverage.
    - Paper Classes: Final Paper Class focused on exam-style questions.
    - Practice Examinations: Conducted at 42 physical exam centers.
    - Progress Tracking & Results Analysis: Technology-based monitoring and mark reviews.

    COMMUNICATION:
    - Telegram channels for theory/revision (separate for 2025, 2026, 2027 batches).
    - Top 20 student rankings are published after each exam.

    PHYSICAL EXAM CENTERS:
    Nugegoda (Rotary), Anuradhapura (Susipwan), Galle (Science Center), Ambalangoda (Science Center), Akuressa (Instar), Ampara (Shilpa), Awissawella (Sampatha), Badulla (Wijaya Vidyalaya), Balangoda (Vishva), Bandarawela (EDUWAY), Bibila (Didula), Chilaw (Shilpa), Dambulla (Sarasavi), Dehiattakandiya (Takshila), Embilipitiya (Piyawara), Gampaha (Indeepa), Gampola (Gurumadala), Horana (Vidarshi), Kanthale (Sipline), Kandy (Gaveshi), Kebitigollawa (Sipsayura), Kegalle (Siyovin), Kalutara (Success), Kuliyapitiya (Ruwana), Kurunegala (Sensip), Mahiyanganaya (Vishva), Matale (INS School), Matara (Apeiro), Mathugama (Sipli), Monaragala (Thrimana), Nattandiya (Evening School), Negombo (A ONE), Nuwara Eliya (ABC), Panadura (PJR), Polonnaruwa (Gurukula), Puttalam (MSE), Rathnapura (Takshila), Rikillagaskada (Sipnana), Tangalle (Nanoda), Thambuttegama (DMS), Tissamaharama (Tele Takshila), Wellawaya (Vidya Pradeepa).

    ONLINE PORTALS:
    - Student: student.echem.lk
    - Results: results.echem.lk
    - Reviews: reviews.echem.lk
    - Information: info.echem.lk
    - Final Paper Class: finalpaper.echem.lk
    - ECHEM Journey: journey.echem.lk
    - Feedback/Complaints: feedback.echem.lk";
            // Using the updated 2026 model ID
            $response = Gemini::generativeModel(model: 'gemini-2.5-flash')
                ->generateContent($context . "\n\nUser: " . $userMessage);

            return response()
                ->json(['reply' => $response->text()])
                ->header('Access-Control-Allow-Origin', config('app.url'))
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        } catch (Exception $e) {
            // Log the error for debugging
            Log::error('Chat API Error', [
                'message' => $e->getMessage(),
                'user_message' => $userMessage ?? 'Unknown'
            ]);
            
            // Return generic error message in production
            return response()
                ->json(['reply' => 'I apologize, I\'m currently unable to process your request. Please try again in a few moments or contact our support team.', 'error' => true], 500)
                ->header('Access-Control-Allow-Origin', config('app.url'))
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
    }
}