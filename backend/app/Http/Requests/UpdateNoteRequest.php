<?php

namespace App\Http\Requests;

use App\Models\Note;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateNoteRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'max:4095']
        ];
    }

    public function authorize()
    {
        $note_id = $this->route('id');
        $note = Note::find($note_id);
        return Gate::allows('update-note', [$note]);
    }
}
