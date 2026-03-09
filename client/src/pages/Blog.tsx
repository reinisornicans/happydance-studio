import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const blogHeroImg = "/assets/images/blog-hero.jpg";

export default function Blog() {
  return (
    <div className="w-full bg-background">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <img 
          src={blogHeroImg}
          alt="Mindful dance journal" 
          className="absolute inset-0 w-full h-full object-cover grayscale"
          data-testid="img-blog-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-5" data-testid="text-blog-title">
            Mindful Dance Journal
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-light">Reflections and research-based insights on the inner world of dance and teaching.</p>
        </div>
      </div>
      {/* Blog Posts */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-5xl">
          <div className="space-y-16 md:space-y-24">
            {blogPosts.map((post, index) => (
              <article 
                key={post.id} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                data-testid={`card-blog-${post.id}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative overflow-hidden rounded-md aspect-[4/3] bg-muted group cursor-pointer">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                        data-testid={`img-blog-${post.id}`}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="text-sm text-muted-foreground mb-3" data-testid={`text-date-${post.id}`}>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors" data-testid={`link-title-${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  {post.subtitle && (
                    <p className="text-lg text-primary font-medium mb-4 italic" data-testid={`text-subtitle-${post.id}`}>
                      {post.subtitle}
                    </p>
                  )}
                  <p className="text-muted-foreground text-base leading-relaxed mb-6" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                    data-testid={`link-read-more-${post.id}`}
                  >
                    Read more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Author Section */}
      <section className="py-16 md:py-24 bg-sage-50/40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-medium mb-4">
            The Dance Continues
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-2">
            Written with care by <span className="text-foreground font-medium">Mg. arts Līva Ornicāne</span>
          </p>
          <p className="text-muted-foreground text-sm">
            Dance educator | Creator of mindful tools | Always learning through movement
          </p>
        </div>
      </section>
    </div>
  );
}
