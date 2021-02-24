import { NextApiHandler } from 'next'
import { getArticle } from '../../../services/microcms/articles'

const ActivityPreviewRoute: NextApiHandler = async (req, res) => {
  const { id, draftKey } = req.query
  if (typeof id !== 'string' || typeof draftKey !== 'string') {
    res.status(404).end()
    return
  }

  const article = await getArticle(id, draftKey)
  if (!article) {
    res.status(404).json({ message: 'article not found' })
    return
  }

  res.setPreviewData({ draftKey })
  res.writeHead(307, { Location: `/activity/${id}` })
  res.end('Preview mode enabled')
}

export default ActivityPreviewRoute
