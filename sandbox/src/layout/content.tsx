import jsx from 'texsaur';

const ContentLayout: JSX.Component = (_, children) =>
    <main class="grid">
        <div class="box">
            {children}
        </div>
    </main>;

export default ContentLayout;