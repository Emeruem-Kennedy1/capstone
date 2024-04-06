# Database Design 

## Overview

This document outlines the design and structure of the music database used in this project. The database captures information about artists, their songs, and the sampling relationships between songs, providing a comprehensive view of musical influences and connections.

## Database Schema

The database consists of three main tables: `Artists`, `Songs`, and `Samples`.

### Tables and Relationships

#### Artists

- **Description**: Represents music artists. Each artist has a unique identifier and a name.
- **Fields**:
  - `id`: Primary key, integer, auto-increments.
  - `name`: String, name of the artist.

#### Songs

- **Description**: Represents individual songs. Each song is linked to an artist and can have multiple sampling relationships with other songs.
- **Fields**:
  - `id`: Primary key, integer, auto-increments.
  - `title`: String, title of the song.
  - `artist_id`: Foreign key, references `Artists.id`.
  - `release_date`: Date, the release date of the song.
- **Relationships**:
  - Belongs to one `Artist`.

#### Samples

- **Description**: Represents the sampling relationship between songs. It indicates which song samples which, along with additional details about the sample.
- **Fields**:
  - `id`: Primary key, integer, auto-increments.
  - `sampling_song_id`: Foreign key, references `Songs.id`.
  - `sampled_song_id`: Foreign key, references `Songs.id`.
  - `details`: Text, details about the sample.
- **Relationships**:
  - Many-to-many between `Songs` (a song can sample multiple songs and be sampled by multiple songs).

### Diagram

![Example Image](./images/db-diagram.png)

### Indexes

- `songs(title)`: Improves search performance on song titles.
- `samples(sampling_song_id, sampled_song_id)`: Facilitates efficient lookup of sampling relationships.

## Migration Strategy

## Seeding Strategy