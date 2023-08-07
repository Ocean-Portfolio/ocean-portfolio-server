-- 여행 계획 테이블

CREATE TABLE travel_plan (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    plan_date DATE NOT NULL,
    plan_time TIME,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_travel_plan_modtime
BEFORE UPDATE ON travel_plan
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- 여행 비용 테이블

CREATE TABLE travel_plan_bills (
    id SERIAL PRIMARY KEY,
    travel_plan_id INT REFERENCES travel_plan(id),
    billing_title VARCHAR(255) NOT NULL,
    bill INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_billing_modtime
BEFORE UPDATE ON travel_plan_bills
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();