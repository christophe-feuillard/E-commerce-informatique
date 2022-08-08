<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CardRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CardRepository::class)]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups("groupe:get")]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $number = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $date = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $cvc = null;

    #[ORM\OneToOne(inversedBy: 'card', cascade: ['persist', 'remove'], fetch: 'EAGER')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getCvc(): ?string
    {
        return $this->cvc;
    }

    public function setCvc(string $cvc): self
    {
        $this->cvc = $cvc;

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
}
