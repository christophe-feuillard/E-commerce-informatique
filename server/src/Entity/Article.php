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

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?int $visit = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups("groupe:get")]
    private $stock;



    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?int $weight = null;

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?int $lenght = null;

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?int $height = null;

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?int $width = null;

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?float $discount = null;

    #[ORM\Column(nullable: true)]
    #[Groups("groupe:get")]
    private ?float $old_price = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $startDicount = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $endDiscount = null;

    public function __construct()
    {
        $this->categorie = new ArrayCollection();
        $this->user = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->avis = new ArrayCollection();
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

    public function getVisit(): ?int
    {
        return $this->visit;
    }

    public function setVisit(?int $visit): self
    {
        $this->visit = $visit;

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

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addFavori($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeFavori($this);
        }

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

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(?int $width): self
    {
        $this->width = $width;

        return $this;
    }

    public function getDiscount(): ?float
    {
        return $this->discount;
    }

    public function setDiscount(?float $discount): self
    {
        $this->discount = $discount;

        return $this;
    }

    public function getOldPrice(): ?float
    {
        return $this->old_price;
    }

    public function setOldPrice(?float $old_price): self
    {
        $this->old_price = $old_price;

        return $this;
    }

    public function getStartDicount(): ?string
    {
        return $this->startDicount;
    }

    public function setStartDicount(?string $startDicount): self
    {
        $this->startDicount = $startDicount;

        return $this;
    }

    public function getEndDiscount(): ?string
    {
        return $this->endDiscount;
    }

    public function setEndDiscount(?string $endDiscount): self
    {
        $this->endDiscount = $endDiscount;

        return $this;
    }
}
