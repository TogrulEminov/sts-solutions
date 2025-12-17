import CallAction from '@/src/ui/layout/call-action'
import FagSection from './fag'
import NewsSection from './news'
import ConsultingSection from './consulting'
import ProjectsSection from './project'
import PartnerSection from './partner'

export default function HomePageContainer() {
  return (
    <main>
      <PartnerSection/>
      <ProjectsSection/>
      <ConsultingSection/>
      <NewsSection/>
      <FagSection/>
      <CallAction/>
    </main>
  )
}
