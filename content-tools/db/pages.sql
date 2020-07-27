create table if not exists pages(
    id int unsigned not null auto_increment,
    link_url varchar(255) not null,
    title varchar(100) not null,
    paragraph text not null,
    video_url varchar(255) not null,
    image_url varchar(255) not null, 
    primary key (id)
)