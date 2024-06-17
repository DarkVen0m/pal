<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\DeleteNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    public function list(Request $request)
    {
        return Note::query()
            ->where('user_id', $request->user()->id)
            ->get();
    }

    public function create(CreateNoteRequest $request)
    {
        return Note::create(array_merge(
            ['user_id' => $request->user()->id],
            $request->validated()
        ));
    }

    public function delete(DeleteNoteRequest $request, $id)
    {
        Note::find($id)->delete();
        return ['note_id' => $id];
    }

    public function update(UpdateNoteRequest $request, $id)
    {
        $note = Note::where('id', $id)->firstOrFail();
        $note->update($request->validated());
        return $note;
    }
}
