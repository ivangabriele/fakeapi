import { faker } from '@faker-js/faker'
import { promises as fs } from 'fs'

/**
 * @param {string}                    resourceName  Singular lowercase resource name (i.e.: "")
 * @param {(index: number) => Record<string, any>} generator     Single resource item generator
 * @param {number}                    length        Number of resource items to generate (positive non-zeo integer)
 *
 * @returns {Promise<void>}
 */
async function generate(resourceName, generator, length) {
  const resourceItems = new Array(length).fill(null).map((_, index) => generator(index))
  const resourceItemsAsJson = JSON.stringify(resourceItems, null, 2)

  await fs.writeFile(`./api/${resourceName}s.json`, resourceItemsAsJson, 'utf-8')
}

generate(
  'user',
  index => ({
    id: index + 1,
    avatar: faker.image.avatar(),
    birthdate: faker.date.birthdate(),
    email: faker.internet.email(),
    registeredAt: faker.date.past(),
    username: faker.internet.userName(),
  }),
  100000,
)
