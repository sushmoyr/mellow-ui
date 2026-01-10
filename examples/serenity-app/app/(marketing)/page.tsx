'use client';

import NextLink from 'next/link';
import {
  Container,
  VStack,
  HStack,
  Stack,
  Grid,
  GridItem,
  Button,
  ButtonGroup,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  IconButton,
  Tag,
  Avatar,
  AvatarGroup,
  Divider,
  Progress,
  List,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Link,
  Kbd,
  Spacer,
  Tooltip,
} from '@mellow-ui/react';
import {
  mockFeatures,
  mockTestimonials,
  mockPricingPlans,
  mockFAQ,
  mockKeyboardShortcuts,
} from '@/lib/mock-data';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <Container maxWidth="xl">
          <HStack justify="between" align="center" className={styles.navContent}>
            <HStack gap="sm" align="center">
              <span className={styles.logoIcon}>🌿</span>
              <span className={styles.logoText}>Serenity</span>
            </HStack>
            <HStack gap="md" align="center">
              <Link href="#features" className={styles.navLink}>Features</Link>
              <Link href="#pricing" className={styles.navLink}>Pricing</Link>
              <Link href="#faq" className={styles.navLink}>FAQ</Link>
              <Button as={NextLink} href="/dashboard" variant="solid" color="primary" size="sm">
                Get Started
              </Button>
            </HStack>
          </HStack>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <Container maxWidth="lg">
          <VStack gap="xl" align="center" className={styles.heroContent}>
            <Badge variant="soft" color="primary" size="lg">
              ✨ New: Sleep tracking now available
            </Badge>
            <h1 className={styles.heroTitle}>
              Your personal wellness journey,{' '}
              <span className={styles.heroGradient}>beautifully tracked</span>
            </h1>
            <p className={styles.heroDescription}>
              Serenity helps you build mindful habits, track your mood, and achieve your goals
              with a calming interface designed for your wellbeing.
            </p>
            <HStack gap="md">
              <Button as={NextLink} href="/dashboard" variant="solid" color="primary" size="lg">
                Start Free Trial
              </Button>
              <Button as={NextLink} href="#features" variant="outline" size="lg">
                Learn More
              </Button>
            </HStack>
            <HStack gap="sm" align="center" className={styles.socialProof}>
              <AvatarGroup max={4} size="sm">
                <Avatar name="Sarah M." />
                <Avatar name="James K." />
                <Avatar name="Maya R." />
                <Avatar name="Alex C." />
                <Avatar name="Jordan L." />
              </AvatarGroup>
              <span className={styles.socialProofText}>
                Loved by <strong>10,000+</strong> wellness seekers
              </span>
            </HStack>
          </VStack>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <Container maxWidth="xl">
          <VStack gap="xl">
            <VStack gap="md" align="center" className={styles.sectionHeader}>
              <Tag color="primary" variant="soft">Features</Tag>
              <h2 className={styles.sectionTitle}>Everything you need for mindful living</h2>
              <p className={styles.sectionDescription}>
                Powerful tools wrapped in a calm, delightful experience
              </p>
            </VStack>
            <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="lg">
              {mockFeatures.map((feature, index) => (
                <GridItem key={index}>
                  <Card variant="elevated" hoverable padding="lg">
                    <CardContent>
                      <VStack gap="md" align="start">
                        <IconButton variant="soft" color="primary" size="lg" aria-label={feature.title}>
                          {feature.icon}
                        </IconButton>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>{feature.description}</p>
                      </VStack>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <Container maxWidth="lg">
          <Card variant="filled" padding="lg">
            <Grid columns={{ base: 2, md: 4 }} gap="lg">
              {[
                { label: 'Active Users', value: '10,000+', progress: 85 },
                { label: 'Habits Tracked', value: '500K+', progress: 92 },
                { label: 'Journal Entries', value: '1M+', progress: 78 },
                { label: 'Goals Achieved', value: '50K+', progress: 70 },
              ].map((stat, index) => (
                <GridItem key={index}>
                  <VStack gap="sm" align="center">
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                    <Progress value={stat.progress} size="sm" color="primary" />
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </Card>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <Container maxWidth="xl">
          <VStack gap="xl">
            <VStack gap="md" align="center" className={styles.sectionHeader}>
              <Tag color="accent" variant="soft">Testimonials</Tag>
              <h2 className={styles.sectionTitle}>Loved by wellness seekers</h2>
            </VStack>
            <Grid columns={{ base: 1, md: 3 }} gap="lg">
              {mockTestimonials.map((testimonial, index) => (
                <GridItem key={index}>
                  <Card variant="outlined" padding="lg" className={styles.testimonialCard}>
                    <CardContent>
                      <VStack gap="md">
                        <p className={styles.testimonialContent}>"{testimonial.content}"</p>
                        <Divider />
                        <HStack gap="md" align="center">
                          <Avatar name={testimonial.name} size="md" />
                          <VStack gap="none" align="start">
                            <span className={styles.testimonialName}>{testimonial.name}</span>
                            <span className={styles.testimonialRole}>{testimonial.role}</span>
                          </VStack>
                        </HStack>
                      </VStack>
                    </CardContent>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <Container maxWidth="xl">
          <VStack gap="xl">
            <VStack gap="md" align="center" className={styles.sectionHeader}>
              <Tag color="success" variant="soft">Pricing</Tag>
              <h2 className={styles.sectionTitle}>Simple, transparent pricing</h2>
              <p className={styles.sectionDescription}>
                Start free, upgrade when you're ready
              </p>
            </VStack>
            <Grid columns={{ base: 1, md: 3 }} gap="lg">
              {mockPricingPlans.map((plan, index) => (
                <GridItem key={index}>
                  <Card
                    variant={plan.popular ? 'elevated' : 'outlined'}
                    padding="lg"
                    className={plan.popular ? styles.popularPlan : ''}
                  >
                    {plan.popular && (
                      <Badge variant="solid" color="primary" className={styles.popularBadge}>
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <VStack gap="lg">
                        <div className={styles.price}>
                          <span className={styles.priceValue}>
                            ${plan.price}
                          </span>
                          {plan.price > 0 && <span className={styles.pricePeriod}>/month</span>}
                        </div>
                        <List>
                          {plan.features.map((feature, featureIndex) => (
                            <ListItem key={featureIndex}>
                              <HStack gap="sm">
                                <span className={styles.checkIcon}>✓</span>
                                <span>{feature}</span>
                              </HStack>
                            </ListItem>
                          ))}
                        </List>
                      </VStack>
                    </CardContent>
                    <CardFooter>
                      <Button
                        fullWidth
                        variant={plan.popular ? 'solid' : 'outline'}
                        color="primary"
                      >
                        {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faq}>
        <Container maxWidth="md">
          <VStack gap="xl">
            <VStack gap="md" align="center" className={styles.sectionHeader}>
              <Tag color="warning" variant="soft">FAQ</Tag>
              <h2 className={styles.sectionTitle}>Frequently asked questions</h2>
            </VStack>
            <Accordion type="single" collapsible className={styles.accordion}>
              {mockFAQ.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <Container maxWidth="md">
          <Card variant="filled" padding="xl" className={styles.ctaCard}>
            <VStack gap="lg" align="center">
              <h2 className={styles.ctaTitle}>Ready to start your wellness journey?</h2>
              <p className={styles.ctaDescription}>
                Join thousands of people building healthier habits with Serenity.
              </p>
              <ButtonGroup>
                <Button as={NextLink} href="/dashboard" variant="solid" color="primary" size="lg">
                  Get Started Free
                </Button>
                <Button variant="ghost" size="lg">
                  Watch Demo
                </Button>
              </ButtonGroup>
            </VStack>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <Container maxWidth="xl">
          <VStack gap="lg">
            <Grid columns={{ base: 1, md: 4 }} gap="lg">
              <GridItem>
                <VStack gap="md" align="start">
                  <HStack gap="sm" align="center">
                    <span className={styles.logoIcon}>🌿</span>
                    <span className={styles.logoText}>Serenity</span>
                  </HStack>
                  <p className={styles.footerDescription}>
                    Your personal wellness companion for mindful living.
                  </p>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack gap="sm" align="start">
                  <h4 className={styles.footerHeading}>Product</h4>
                  <Link href="#features">Features</Link>
                  <Link href="#pricing">Pricing</Link>
                  <Link href="#faq">FAQ</Link>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack gap="sm" align="start">
                  <h4 className={styles.footerHeading}>Company</h4>
                  <Link href="#">About</Link>
                  <Link href="#">Blog</Link>
                  <Link href="#">Careers</Link>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack gap="sm" align="start">
                  <h4 className={styles.footerHeading}>Shortcuts</h4>
                  {mockKeyboardShortcuts.slice(0, 3).map((shortcut, index) => (
                    <HStack key={index} gap="sm" align="center">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <Kbd>{key}</Kbd>
                          {keyIndex < shortcut.keys.length - 1 && ' + '}
                        </span>
                      ))}
                      <span className={styles.shortcutAction}>{shortcut.action}</span>
                    </HStack>
                  ))}
                </VStack>
              </GridItem>
            </Grid>
            <Divider />
            <HStack justify="between" align="center" className={styles.footerBottom}>
              <span className={styles.copyright}>
                © 2024 Serenity. Built with MellowUI.
              </span>
              <HStack gap="md">
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </footer>
    </div>
  );
}
