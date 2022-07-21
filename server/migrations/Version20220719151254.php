<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220719151254 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE visited_article (visited_id INT NOT NULL, article_id INT NOT NULL, INDEX IDX_8D1359C38C9FE8F (visited_id), INDEX IDX_8D1359C7294869C (article_id), PRIMARY KEY(visited_id, article_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE visited_article ADD CONSTRAINT FK_8D1359C38C9FE8F FOREIGN KEY (visited_id) REFERENCES visited (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE visited_article ADD CONSTRAINT FK_8D1359C7294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article DROP visited');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE visited_article');
        $this->addSql('ALTER TABLE article ADD visited INT DEFAULT NULL');
    }
}
