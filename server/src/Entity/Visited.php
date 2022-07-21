<?php

namespace App\Entity;

use App\Repository\VisitedRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: VisitedRepository::class)]
class Visited
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'visiteds',fetch: 'EAGER')]
    private $user;

    #[ORM\ManyToMany(targetEntity: Article::class, inversedBy: 'visiteds',fetch: 'EAGER')]
    private $articles;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $stats;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Article>
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        $this->articles->removeElement($article);

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
