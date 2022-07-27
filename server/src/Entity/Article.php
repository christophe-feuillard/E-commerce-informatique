<?php

namespace App\Entity;

use App\Entity\Categorie;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups("groupe:get")]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $titre;

    #[ORM\Column(type: 'float')]
    #[Groups("groupe:get")]
    private $prix;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $photo;

    #[ORM\Column(type: 'text')]
    #[Groups("groupe:get")]
    private $description;

    #[ORM\Column(type: 'text')]
    #[Groups("groupe:get")]
    private $caracteristique;

    #[ORM\ManyToMany(targetEntity: Categorie::class, inversedBy: 'articles')]
    private $categorie;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $stock;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $width;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $lenght;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $height;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $weight;

    public function __construct()
    {
        $this->categorie = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCaracteristique(): ?string
    {
        return $this->caracteristique;
    }

    public function setCaracteristique(string $caracteristique): self
    {
        $this->caracteristique = $caracteristique;

        return $this;
    }

    /**
     * @return Collection<int, Categorie>
     */
    public function getCategorie(): Collection
    {
        return $this->categorie;
    }

    public function addCategorie(Categorie $categorie): self
    {
        if (!$this->categorie->contains($categorie)) {
            $this->categorie[] = $categorie;
        }

        return $this;
    }

    public function removeCategorie(Categorie $categorie): self
    {
        $this->categorie->removeElement($categorie);

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(?int $width): self
    {
        $this->width = $width;

        return $this;
    }

    public function getLenght(): ?int
    {
        return $this->lenght;
    }

    public function setLenght(?int $lenght): self
    {
        $this->lenght = $lenght;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(?int $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }
}
