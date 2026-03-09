import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const params = useParams<{ id: string }>();
  const postId = params.id;
  
  const currentIndex = blogPosts.findIndex(p => p.id === postId);
  const post = blogPosts[currentIndex];
  
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <div className="w-full bg-background min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4" data-testid="text-post-not-found">Post not found</h1>
          <Link href="/blog">
            <Button variant="outline" data-testid="button-back-to-blog-404">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const text = paragraph.slice(2, -2);
        return (
          <p key={index} className="font-medium text-foreground text-lg my-6">
            {text}
          </p>
        );
      }
      
      const parts = paragraph.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      const rendered = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-foreground font-medium">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return part;
      });

      return (
        <p key={index} className="text-muted-foreground text-base md:text-[1.0625rem] leading-[1.9] mb-4">
          {rendered}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-background pt-24">
      {/* Back to Blog */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl pt-4">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          data-testid="link-back-to-blog"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Hero Image */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-md aspect-[16/9] bg-muted">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              data-testid="img-post-hero"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl">
          <header className="mb-10 text-center">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-post-meta">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} · {post.author}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mb-4" data-testid="text-post-title">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-lg md:text-xl text-primary font-medium italic" data-testid="text-post-subtitle">
                {post.subtitle}
              </p>
            )}
          </header>

          <div className="prose prose-lg max-w-none" data-testid="content-post-body">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* Navigation */}
      <nav className="py-12 md:py-16 border-t border-border/30">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-6">
            {prevPost ? (
              <Link 
                href={`/blog/${prevPost.id}`}
                className="group flex-1"
                data-testid="link-prev-post"
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-2 group-hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Previous</span>
                </div>
                <p className="font-serif text-lg font-medium group-hover:text-primary transition-colors" data-testid="text-prev-post-title">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {nextPost ? (
              <Link 
                href={`/blog/${nextPost.id}`}
                className="group flex-1 text-right"
                data-testid="link-next-post"
              >
                <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2 group-hover:text-foreground transition-colors">
                  <span className="text-sm">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="font-serif text-lg font-medium group-hover:text-primary transition-colors" data-testid="text-next-post-title">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </nav>

      {/* Back to Blog CTA */}
      <section className="py-12 md:py-16 bg-sage-50/40">
        <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-3xl text-center">
          <p className="font-serif text-xl italic text-muted-foreground mb-6">
            "The dance continues..."
          </p>
          <Link href="/blog">
            <Button variant="outline" data-testid="button-back-to-all-posts">
              View All Posts
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
