export async function routes() {
    let routesArray = []
    const Endpoints = [
      'posts',
      'pages',
      'projects'
    ]
    wp.createRoutes(await wp.postTypes())

    for (const endpoint of Endpoints) {
      const endpointData = await wp[endpoint]()
      const endpointRoutes = endpointData.map(endpointItem => `/${endpoint}/${endpointItem.slug}`)
      routesArray.push(...endpointRoutes)
    }
    return routesArray
  }