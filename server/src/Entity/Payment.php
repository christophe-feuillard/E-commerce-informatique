<?php

namespace App\Entity;

use App\Repository\PaymentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaymentRepository::class)]
class Payment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $payment_type = null;

    #[ORM\Column]
    private ?float $amount = null;

    #[ORM\ManyToOne(inversedBy: 'payments')]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'payments')]
    private ?PhysicalAdresses $adresse = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentType(): ?\DateTimeInterface
    {
        return $this->payment_type;
    }

    public function setPaymentType(\DateTimeInterface $payment_type): self
    {
        $this->payment_type = $payment_type;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getAdresse(): ?PhysicalAdresses
    {
        return $this->adresse;
    }

    public function setAdresse(?PhysicalAdresses $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }
}
