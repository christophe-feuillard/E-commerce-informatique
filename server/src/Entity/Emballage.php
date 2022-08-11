<?php

namespace App\Entity;

use App\Repository\EmballageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EmballageRepository::class)]
class Emballage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: '', cascade: ['persist', 'remove'], fetch: "EAGER")]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $startDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $endDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $titre = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStartDate(): ?string
    {
        return $this->startDate;
    }

    public function setStartDate(?string $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?string
    {
        return $this->endDate;
    }

    public function setEndDate(?string $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(?string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }
}
