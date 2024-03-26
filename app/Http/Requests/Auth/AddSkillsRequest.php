<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use App\Models\Skill;
use App\Models\User;

class AddSkillsRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "user_id" => ["required", "int", "exists:Users,id"],
            "skill_ids" => ["required", "array"],
            "skill_ids.*" => ["required", "int", "max:30", "exists:" . app(Skill::class)->getTable() . ",id"],
        ];
    }

    public function passedValidation()
    {
        $userSkills = [];

        foreach ($this->skill_ids as $skill_id) {
            $userSkills[] = [
                'skill_id' => $skill_id,
            ];
        }

        $this->merge(['userSkills' => $userSkills]);
    }

    public function validatedSkillsData()
    {
        return $this->userSkills;
    }
}
