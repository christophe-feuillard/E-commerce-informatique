<?php

namespace App\Entity;

use App\Repository\OrderDetailsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderDetailsRepository::class)]
class OrderDetails
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $prenom = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $adresse_de_livraison = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $code_postale = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $ville = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $numero_de_suivis = null;

    #[ORM\Column]
    #[Groups("groupe:get")]
    private ?\DateTimeImmutable $created_at = null;
    

    #[ORM\ManyToOne(inversedBy: 'orderDetails', fetch: "EAGER")]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'commande', targetEntity: OrderItem::class, fetch: "EAGER")]
    #[Groups("groupe:get")]
    private Collection $orderItems;

    public function __construct()
    {
        $this->orderItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getAdresseDeLivraison(): ?string
    {
        return $this->adresse_de_livraison;
    }

    public function setAdresseDeLivraison(string $adresse_de_livraison): self
    {
        $this->adresse_de_livraison = $adresse_de_livraison;

        return $this;
    }

    public function getCodePostale(): ?string
    {
        return $this->code_postale;
    }

    public function setCodePostale(string $code_postale): self
    {
        $this->code_postale = $code_postale;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getNumeroDeSuivis(): ?string
    {
        return $this->numero_de_suivis;
    }

    public function setNumeroDeSuivis(string $numero_de_suivis): self
    {
        $this->numero_de_suivis = $numero_de_suivis;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

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

    /**
     * @return Collection<int, OrderItem>
     */
    public function getOrderItems(): Collection
    {
        return $this->orderItems;
    }

    public function addOrderItem(OrderItem $orderItem): self
    {
        if (!$this->orderItems->contains($orderItem)) {
            $this->orderItems[] = $orderItem;
            $orderItem->setCommande($this);
        }

        return $this;
    }

    public function removeOrderItem(OrderItem $orderItem): self
    {
        if ($this->orderItems->removeElement($orderItem)) {
            // set the owning side to null (unless already changed)
            if ($orderItem->getCommande() === $this) {
                $orderItem->setCommande(null);
            }
        }

        return $this;
    }
}
