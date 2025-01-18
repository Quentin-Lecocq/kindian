# Informations to get from Google Books API

- isbn13 -> volumeInfo.industryIdentifiers[0].identifier
- isbn10 -> volumeInfo.industryIdentifiers[1].identifier
- publishedDate -> volumeInfo.publishedDate
- pageCount -> volumeInfo.pageCount
- description -> volumeInfo.description
- imageUrl -> volumeInfo.imageLinks.thumbnail
- publisher -> volumeInfo.publisher
- googleBooksId -> id
- subtitle -> volumeInfo.subtitle
- categories -> volumeInfo.categories
- smallThumbnail -> volumeInfo.imageLinks.smallThumbnail
- thumbnail -> volumeInfo.imageLinks.thumbnail
- textSnippet -> searchInfo.textSnippet
