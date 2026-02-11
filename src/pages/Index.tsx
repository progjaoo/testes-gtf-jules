import { AdBanner } from '@/components/portal/AdBanner';
import { HeroSection } from '@/components/portal/HeroSection';
import { EditorialSection } from '@/components/portal/EditorialSection';
import { NewsGrid } from '@/components/portal/NewsGrid';
import { SectionHeader } from '@/components/portal/SectionHeader';
import { Footer } from '@/components/portal/Footer';
import { mockNews, mockNegociosNews } from '@/data/mockNews';
import { StickyHeader } from '@/components/portal/StickyHeader';
import { NewsCard } from '@/components/portal/NewsCard';
import { VerMaisButton } from '@/components/portal/VerMaisButton';
import { useQuery } from '@tanstack/react-query';
import { StrapiService } from '@/services/strapi.service';
import { mapStrapiArticleToNewsItem } from '@/utils/mappers';

function PortalContent() {
  const { data: strapiArticles = [] } = useQuery({
    queryKey: ['articles'],
    queryFn: StrapiService.getArticles,
  });

  const news = strapiArticles.length > 0
    ? strapiArticles.map(mapStrapiArticleToNewsItem)
    : mockNews;

  const mainNews = news[0];
  const sideNews = news.slice(1, 10);
  const gridNews = news.slice(2, 8);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <StickyHeader />

      <AdBanner />

      {/* Hero Section */}
      <HeroSection mainNews={mainNews} sideNews={sideNews} />

      {/* Main News Grid */}
      <section className="container pb-24 mt-[50px]">
        <NewsGrid news={gridNews} columns={3} />
      </section>

      {/* Secondary Grid */}
      <section className="container pb-8">
        <NewsGrid news={news.slice(8, 11)} columns={3} />
      </section>

      {/* Negócios Section */}
      <EditorialSection 
        title="Negócios" 
        editorial="negocios" 
        news={news.filter(n => n.editoria === 'negocios').slice(0, 4)}
      />
      <VerMaisButton size="full"/>

      {/* Theme Sections */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <SectionHeader title="Tema Um" editorial="nacional" />
                    <div className="space-y-4">
                      {sideNews.slice(3, 6).map((news) => (
                        <NewsCard 
                          key={news.id} 
                          news={news} 
                          variant="horizontal"
                          showSubtitle={false}
                        />
                      ))}
                    </div>
                    <VerMaisButton size="medium" />


          </div>
          <div>
            <SectionHeader title="Tema dois" editorial="cultura" />
                    <div className="space-y-4">
                      {sideNews.slice(1, 4).map((news) => (
                        <NewsCard 
                          key={news.id} 
                          news={news} 
                          variant="horizontal"
                          showSubtitle={false}
                        />
                      ))}
                    </div>
                    <VerMaisButton size="medium"/>
          </div>
          <div>
            <SectionHeader title="Tema três" editorial="esportes" />
                    <div className="space-y-4">
                      {sideNews.slice(2, 5).map((news) => (
                        <NewsCard 
                          key={news.id} 
                          news={news} 
                          variant="horizontal"
                          showSubtitle={false}
                        />
                      ))}
                    </div>
                  <VerMaisButton size="medium"/>
          </div>
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <AdBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}

const Index = () => {
  return <PortalContent />;
};

export default Index;
