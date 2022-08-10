<?php

namespace App\Entity;

use App\Repository\PaymentsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PaymentsRepository::class)]
class Payments
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'payments')]
    private ?PhysicalAdresses $adress = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdress(): ?PhysicalAdresses
    {
        return $this->adress;
    }

    public function setAdress(?PhysicalAdresses $adress): self
    {
        $this->adress = $adress;

        return $this;
    }
}
