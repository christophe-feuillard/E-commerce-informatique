<?php

namespace App\Entity;

use App\Repository\VisitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisitRepository::class)]
class Visit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Article::class, inversedBy: 'user')]
    private $article;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'stats')]
    private $user;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $stats;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticle(): ?Article
    {
        return $this->article;
    }

    public function setArticle(?Article $article): self
    {
        $this->article = $article;

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

    public function getStats(): ?int
    {
        return $this->stats;
    }

    public function setStats(?int $stats): self
    {
        $this->stats = $stats;

        return $this;
    }
}
