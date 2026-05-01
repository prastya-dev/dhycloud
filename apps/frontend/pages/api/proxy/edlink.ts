import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { token } = req.body
  if (!token) return res.status(400).json({ message: 'Token tidak ada' })

  const LIMIT = 10

  const fetchPage = async (page: number) => {
    const res = await fetch('https://api.edlink.id/api/v1.4/notification/all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // ✅ Kirim page + offset sekaligus
      body: JSON.stringify({
        page,
        limit: LIMIT,
        dataProvider: JSON.stringify({
          criterion: [],
          page: {
            current: page,
            limit: LIMIT
          },
          sort: []
        })
      })
    })
    return res.json()
  }

  try {
    const firstJson = await fetchPage(1)
    const allData = [...(firstJson?.data?.data ?? [])]

    const raw = firstJson?.data?.dataProvider
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    const total = parsed?.page?.total ?? 0
    const totalPages = Math.ceil(total / LIMIT)


    for (let page = 2; page <= totalPages; page++) {
      const pageJson = await fetchPage(page)
      const items = pageJson?.data?.data ?? []
      allData.push(...items)
    }

    const unique = Array.from(
      new Map(allData.map(item => [item.id, item])).values()
    )

    console.log('total raw:', allData.length, '| dedup:', unique.length)

    return res.status(200).json({
      data: { data: unique, total: unique.length }
    })

  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ message: 'Gagal menghubungi Edlink' })
  }
}