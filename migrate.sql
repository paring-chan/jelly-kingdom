CREATE TABLE easterEggs(
    type text not null,
    req text not null,
    res text not null
)

CREATE TABLE users(
    id text not null,
    mine int not null default 0
)
