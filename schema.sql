CREATE TABLE threats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    ioc TEXT NOT NULL,
    type TEXT,
    observedAt TEXT
);
