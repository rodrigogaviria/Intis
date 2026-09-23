-- Placeholder para validar el pipeline. Se reemplaza con el modelo real.
CREATE TABLE IF NOT EXISTS notas (
  id        INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  texto     VARCHAR(200) NOT NULL,
  creada_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
