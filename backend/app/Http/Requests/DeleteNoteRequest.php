<?php

namespace App\Http\Requests;

use App\Models\Note;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class DeleteNoteRequest extends FormRequest
{
    public function rules()
    {
        return [];
    }

    public function authorize()
    {
        $note_id = $this->route('id');
        $note = Note::find($note_id);
        return Gate::allows('delete-note', [$note]);
    }
}
