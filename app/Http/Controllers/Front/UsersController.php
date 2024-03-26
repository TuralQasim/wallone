<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\Users\ShowRequest;
use App\Repositories\UserRepository;
use App\Models\User;

class UsersController extends Controller
{
    protected $repository;
    protected $model;

    public function __construct(UserRepository $repository, User $model)
    {
        $this->repository = $repository;
        $this->model = $model;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ShowRequest $request)
    {
        return response()->json([
            'message' => __("User found"),
            'data' => $this->repository->show($request->id ?? null) ?? null,
        ], Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
