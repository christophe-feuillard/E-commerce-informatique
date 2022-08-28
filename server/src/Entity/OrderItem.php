<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderItemRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderItemRepository::class)]
class OrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orderItems', fetch: "EAGER")]
    private ?OrderDetails $commande = null;

    #[ORM\ManyToOne(inversedBy: 'orderItems', fetch: "EAGER")]
    #[Groups("groupe:get")]
    private ?Article $product = null;

    #[ORM\Column]
    #[Groups("groupe:get")]
    private ?int $quantity = null;

    #[ORM\Column(type: 'datetime_immutable', options:['default'=>'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $created_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCommande(): ?OrderDetails
    {
        return $this->commande;
    }

    public function setCommande(?OrderDetails $commande): self
    {
        $this->commande = $commande;

        return $this;
    }

    public function getProduct(): ?Article
    {
        return $this->product;
    }

    public function setProduct(?Article $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

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
}
