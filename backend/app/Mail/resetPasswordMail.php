<?php

namespace App\Mail;

use Faker\Provider\ar_EG\Address;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class resetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;
   // public $resetLink;

  
    /**
     * Create a new message instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
        // $this->resetLink = 'http://localhost:4200/response-password-reset?token=' . $token;
     
    }
    /*
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reset Password Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'Email.passwordReset',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

   // public function build(){  return $this->with(['token'=>$this->token]);}
    
}
