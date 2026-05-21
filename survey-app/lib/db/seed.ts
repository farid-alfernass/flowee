import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

async function createOrUpdateUser(
  email: string,
  password: string,
  name: string,
  role: 'admin' | 'field_team' | 'viewer'
) {
  // Check if user already exists
  const existing = db.select().from(users).where(eq(users.email, email)).get()

  if (existing) {
    // Update role if needed
    if (existing.role !== role) {
      db.update(users).set({ role }).where(eq(users.email, email)).run()
      console.log(`ℹ️  Updated role for ${email} to ${role}`)
    } else {
      console.log(`ℹ️  User ${email} already exists, skipping...`)
    }
    return
  }

  // Create via Better Auth (handles password hashing)
  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  })

  if (result.user) {
    // Set the custom role (Better Auth doesn't set custom fields on signUp)
    db.update(users).set({ role }).where(eq(users.email, email)).run()
    console.log(`✅ Created ${email} with role: ${role}`)
  }
}

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    await createOrUpdateUser('admin@flowee.id', 'Admin123!', 'Admin Flowee', 'admin')
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }

  try {
    await createOrUpdateUser('field@flowee.id', 'Field123!', 'Tim Lapangan', 'field_team')
  } catch (error) {
    console.error('❌ Error creating field team user:', error)
  }

  console.log('')
  console.log('✅ Seeding complete!')
  console.log('')
  console.log('📋 Credentials:')
  console.log('  Admin:      admin@flowee.id / Admin123!')
  console.log('  Field Team: field@flowee.id / Field123!')
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
