require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seeding...');

    console.log('🧹 Cleaning database...');
    await prisma.attendance.deleteMany();
    await prisma.sessionMembership.deleteMany();
    await prisma.session.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.article.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.usersInGroups.deleteMany();
    await prisma.group.deleteMany();
    await prisma.reminder.deleteMany();
    await prisma.nomination.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.electionHistory.deleteMany();
    await prisma.election.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.passwordResetToken.deleteMany();
    await prisma.oTP.deleteMany();
    await prisma.user.deleteMany();
    await prisma.division.deleteMany();
    await prisma.faq.deleteMany();
    await prisma.rule.deleteMany();
    await prisma.testimonial.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    console.log('🏢 Creating Divisions...');
    const divisionsData = [
        { name: 'Competitive Programming', description: 'Algorithms and data structures for competitive coding.' },
        { name: 'Development Division', description: 'Building modern web and mobile applications.' },
        { name: 'Cyber Division', description: 'Focuses on ethical hacking, CTFs, and security research.' },
        { name: 'Data Science', description: 'Machine learning, AI research, and data analytics.' },
        { name: 'Capacity Building Division', description: 'UI/UX design and professional development.' },
        { name: 'Social Media Division', description: 'Handles communications, social presence and outreach.' },
        { name: 'Blockchain Team', description: 'Research and projects around blockchain and decentralized systems.' },
    ];
    const divisions = {};
    for (const div of divisionsData) {
        divisions[div.name] = await prisma.division.create({ data: div });
    }

    console.log('👑 Creating President...');
    const president = await prisma.user.create({
        data: {
            freeName: 'CSEC President',
            email: 'klaus@gmail.com',
            password: hashedPassword,
            role: 'PRESIDENT',
            isEmailVerified: true,
            status: 'ACTIVE',
        },
    });

    // Create groups for each division so the client can list selectable groups
    console.log('🏷️ Creating Groups for Divisions...');
    const groupsData = [
        { division: 'Competitive Programming', groups: ['Div 1', 'Div 2'] },
        { division: 'Development Division', groups: ['Senior Developer', 'Junior Developer'] },
        { division: 'Cyber Division', groups: ['Members'] },
        { division: 'Data Science', groups: ['Members'] },
        { division: 'Capacity Building Division', groups: ['Members'] },
        { division: 'Social Media Division', groups: ['Members'] },
        { division: 'Blockchain Team', groups: ['Members'] },
    ];

    const groupsByDivision = {};
    for (const g of groupsData) {
        const divObj = divisions[g.division];
        if (!divObj) continue; // skip if division missing
        groupsByDivision[g.division] = [];
        for (const name of g.groups) {
            const created = await prisma.group.create({
                data: {
                    name,
                    description: `${name} group of ${g.division}`,
                    divisionId: divObj.id,
                    createdById: president.id,
                },
            });
            groupsByDivision[g.division].push(created);
        }
    }

    

    console.log('👨‍💼 Creating Division Heads...');
    const heads = [
        { name: 'Cyber Head', email: 'cyber@csec.com', role: 'CYBER_HEAD', div: 'Cyber Division' },
        { name: 'Dev Head', email: 'dev@csec.com', role: 'DEV_HEAD', div: 'Development Division' },
        { name: 'CPD Head', email: 'cpd@csec.com', role: 'CPD_HEAD', div: 'Competitive Programming' },
        { name: 'DS Head', email: 'ds@csec.com', role: 'DATA_SCIENCE_HEAD', div: 'Data Science' },
        { name: 'CBD Head', email: 'cbd@csec.com', role: 'CBD_HEAD', div: 'Capacity Building Division' },
    ];

    for (const head of heads) {
        const user = await prisma.user.create({
            data: {
                freeName: head.name,
                email: head.email,
                password: hashedPassword,
                role: head.role,
                divisionId: divisions[head.div].id,
                isEmailVerified: true,
                status: 'ACTIVE',
            },
        });
        await prisma.division.update({
            where: { id: divisions[head.div].id },
            data: { headId: user.id },
        });
    }

    console.log('👥 Creating Initial Members...');
    for (let i = 1; i <= 10; i++) {
        await prisma.user.create({
            data: {
                freeName: `Member ${i}`,
                email: `member${i}@csec.com`,
                password: hashedPassword,
                role: 'MEMBER',
                isEmailVerified: true,
                status: i % 5 === 0 ? 'INACTIVE' : 'ACTIVE',
            },
        });
    }

    console.log('📝 Creating Content (Articles, FAQs, etc.)...');

    const article = await prisma.article.create({
        data: {
            title: 'Welcome to the CSEC Portal',
            content: 'We are excited to launch the new portal for our members. Stay tuned for more updates!',
            authorId: president.id,
            divisionId: divisions['Development Division'].id,
        },
    });

    await prisma.comment.create({
        data: {
            content: 'Great initiative! Looking forward to it.',
            userId: president.id,
            articleId: article.id,
        },
    });

    // Create Events
    await prisma.event.createMany({
        data: [
            {
                title: 'Cyber Security Workshop',
                description: 'Introduction to Web Security and Penetration Testing.',
                location: 'ASTU Main Hall',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
                status: 'PUBLIC',
            },
            {
                title: 'Annual Hackathon 2026',
                description: 'Join us for a 48-hour coding marathon.',
                location: 'Virtual',
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Next month
                status: 'MEMBERS_ONLY',
            },
        ],
    });

    await prisma.faq.createMany({
        data: [
            { question: 'What is CSEC?', answer: 'CSEC ASTU is a student-led organization focused on technology and skill development.' },
            { question: 'How can I join a division?', answer: 'Members can join divisions after registration by applying through the dashboard.' },
        ],
    });

    await prisma.rule.createMany({
        data: [
            { title: 'Be Respectful', description: 'Respect all members and opinions within the community.' },
            { title: 'Active Participation', description: 'Regularly attend sessions and contribute to projects.' },
        ],
    });

    await prisma.testimonial.createMany({
        data: [
            { name: 'Abebe Kebede', role: 'Alumni', description: 'CSEC helped me land my first job at Google!' },
            { name: 'Sara Alemu', role: 'Senior Member', description: 'The community here is amazing and supportive.' },
        ],
    });

    console.log('✅ Seeding completed successfuly!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
