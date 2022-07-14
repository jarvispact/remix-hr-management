import { Link } from '@remix-run/react';
import { PageSection } from '~/components/page-section';

const Card = ({ title, text }: { title: string; text: string }) => {
    return (
        <li>
            <Link
                className="w-full bg-surface-1 rounded-md shadow-md block p-8 card-link"
                to="test"
            >
                <h3>{title}</h3>
                <p>{text}</p>
            </Link>
        </li>
    );
};

const data = [
    {
        entity: 'employee',
        title: 'title',
        text: 'sdlfighsdf sdfsd fsdfsf gdfgdfgdfg fgdfgdfg dfgdfgdfgdfg dfgdfgdfg',
    },
    {
        entity: 'country',
        title: 'title',
        text: 'sdlfighsdf sdfsd fsdfsf gdfgdfgdfg fgdfgdfg dfgdfgdfgdfg dfgdfgdfg',
    },
    {
        entity: 'location',
        title: 'title',
        text: 'sdlfighsdf sdfsd fsdfsf gdfgdfgdfg fgdfgdfg dfgdfgdfgdfg dfgdfgdfg',
    },
];

export default function Dashboard() {
    return (
        <div className="w-[95%] max-w-5xl mx-auto py-12 flex flex-col gap-16">
            <PageSection id="test" title="test" hideTitle>
                <ul className="flex gap-8 flex-col md:flex-row">
                    {data.map(({ entity, title, text }) => (
                        <Card key={entity} title={title} text={text} />
                    ))}
                </ul>
            </PageSection>
            <PageSection id="test2" title="Employees that started this month">
                <ul className="bg-surface-1 p-8 rounded-md shadow-md">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </PageSection>
        </div>
    );
}
