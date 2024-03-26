<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $verificationCode;
    public $email;

    public function __construct($verificationCode, $email)
    {
        $this->verificationCode = $verificationCode;
        $this->email = $email;
    }

    public function build()
    {
        return $this->from('xedice007@yahoo.com', 'Wallone')
            ->to($this->email)
            ->view('emails.verification')
            ->with(['verificationCode' => $this->verificationCode]);
    }
}
