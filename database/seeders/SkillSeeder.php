<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title_en' => "Drawing",
                'title_ru' => "Рисование",
                'status' => 1
            ],
            [
                'title_en' => "Graph. design",
                'title_ru' => "Граф. дизайн",
                'status' => 1
            ],
            [
                'title_en' => "Video editing",
                'title_ru' => "Видео монтаж",
                'status' => 1
            ],
            [
                'title_en' => "Programming",
                'title_ru' => "Програм-ние",
                'status' => 1
            ],
            [
                'title_en' => "Photographer",
                'title_ru' => "Фотограф",
                'status' => 1
            ],
            [
                'title_en' => "Architecture",
                'title_ru' => "Архитектура",
                'status' => 1
            ],
            [
                'title_en' => "Creative",
                'title_ru' => "Креативные",
                'status' => 1
            ]
        ];
        foreach ($data as $value) {
            Skill::create($value);
        }
    }
}
