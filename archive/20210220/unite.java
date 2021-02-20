import pt.up.fe.unite.util.Pair;
import pt.up.fe.unite.util.Logging;
import pt.up.fe.unite.extraction.GraphBuilder;
import pt.up.fe.unite.extraction.reader.Reader;
import pt.up.fe.unite.extraction.reader.MySQLReader;
import pt.up.fe.unite.extraction.parser.UrlDomainParser;
import pt.up.fe.unite.extraction.parser.AnchorDomainParser;
import pt.up.fe.unite.extraction.writer.Writer;
import pt.up.fe.unite.extraction.writer.BlueprintsWriter;

import java.util.Properties;

// ...

Properties readerSettings = new Properties(Reader.DEFAULT_SETTINGS);
Properties writerSettings = new Properties(Writer.DEFAULT_SETTINGS);

readerSettings.setProperty(Reader.SK_HOSTNAME, "mydbhostname");
readerSettings.setProperty(Reader.SK_USERNAME, "myusername");
readerSettings.setProperty(Reader.SK_PASSWORD, "mypassword");
readerSettings.setProperty(Reader.SK_DATABASE, "SAPOBlogSearch");
readerSettings.setProperty(Reader.SK_TABLE,    "rss_entry");
readerSettings.setProperty(Reader.SK_SOURCE,   "url");
readerSettings.setProperty(Reader.SK_TARGET,   "body");
readerSettings.setProperty(Reader.SK_LIMIT,    "20");

writerSettings.setProperty(Writer.SK_DATABASE, "/path/to/graphdb");

Reader reader = null;
Writer writer = null;

try
{
    reader = new MySQLReader(readerSettings);
    Pair<Class,Class> parser = new Pair<Class,Class>(UrlDomainParser.class, AnchorDomainParser.class);
    writer = new BlueprintsWriter(writerSettings);
    GraphBuilder builder = new GraphBuilder(reader, parser, writer);
    builder.run();
}
catch (IllegalArgumentException e)
{
    log.error("Wrong settings, check the API", e);
}

// ...
